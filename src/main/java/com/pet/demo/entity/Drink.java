package com.pet.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName(value = "drink")
public class Drink implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "drink_id", type = IdType.AUTO)
    private Integer drinkId;
    private Float drinkPrice;
    private String drinkPicPath;
    private String drinkName;
    private Float drinkHunger;
    private Float drinkMood;
    private Float drinkThirsty;
    private Float drinkEndu;
    private Float drinkExp;
    private Float drinkHealth;
}
