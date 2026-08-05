package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.entity.Document;
import com.tripnest.tripnestbackend.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

    private final DocumentService service;

    public DocumentController(DocumentService service) {
        this.service = service;
    }

    // Upload Document
    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(
            @RequestParam("tripId") Long tripId,
            @RequestParam("file") MultipartFile file) throws IOException {

        return ResponseEntity.ok(service.uploadDocument(tripId, file));
    }

    // Get Documents by Trip
    @GetMapping("/trip/{tripId}")
    public List<Document> getDocuments(@PathVariable Long tripId) {
        return service.getDocuments(tripId);
    }

    // Delete Document
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {

        service.deleteDocument(id);

        return ResponseEntity.ok("Document deleted successfully.");
    }
}