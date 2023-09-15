package com.pet.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName(value = "present")
public class Present implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "present_id", type = IdType.AUTO)
    private Integer presentId;
    private Float presentPrice;
    private String presentPicPath;
    private String presentName;
    private Float presentMood;
    private Float presentExp;
    private Float presentPerformance;
}
