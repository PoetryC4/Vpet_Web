package com.pet.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName(value = "food")
public class Food implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "food_id", type = IdType.AUTO)
    private Integer foodId;
    private Float foodPrice;
    private String foodPicPath;
    private String foodName;
    private Float foodHunger;
    private Float foodMood;
    private Float foodThirsty;
    private Float foodEndu;
    private Float foodExp;
    private Float foodHealth;
}
