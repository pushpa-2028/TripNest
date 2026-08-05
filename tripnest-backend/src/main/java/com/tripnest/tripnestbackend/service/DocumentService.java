package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.Document;
import com.tripnest.tripnestbackend.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository repository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public DocumentService(DocumentRepository repository) {
        this.repository = repository;
    }

    public Document uploadDocument(Long tripId, MultipartFile file) throws IOException {

        // Create uploads folder if it doesn't exist
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Create unique filename
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // Destination path
        Path destination = uploadPath.resolve(fileName);

        // Copy file
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

        // Save metadata
        Document document = new Document();

        document.setTripId(tripId);
        document.setFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setFilePath(destination.toString());

        return repository.save(document);
    }

    public List<Document> getDocuments(Long tripId) {
        return repository.findByTripId(tripId);
    }

    public void deleteDocument(Long id) {
        repository.deleteById(id);
    }
}