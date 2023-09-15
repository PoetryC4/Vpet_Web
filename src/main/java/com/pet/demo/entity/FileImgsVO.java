package com.pet.demo.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class FileImgsVO implements Serializable {

    private String dirPath;
    private String dirSuffix;
}
