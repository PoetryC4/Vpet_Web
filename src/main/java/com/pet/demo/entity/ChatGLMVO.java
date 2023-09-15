package com.pet.demo.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ChatGLMVO implements Serializable {

    private String question;
    private List<List<String>> history;
    private Boolean streaming;
}
