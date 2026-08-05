package com.tripnest.tripnestbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tripId;

    private String fileName;

    private String fileType;

    private String filePath;

    public Document() {
    }

    public Document(Long id, Long tripId, String fileName, String fileType, String filePath) {
        this.id = id;
        this.tripId = tripId;
        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
    }

    public Long getId() {
        return id;
    }

    public Long getTripId() {
        return tripId;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}