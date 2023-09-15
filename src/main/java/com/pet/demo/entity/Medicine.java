package com.pet.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName(value = "medicine")
public class Medicine implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "medicine_id", type = IdType.AUTO)
    private Integer medicineId;
    private Float medicinePrice;
    private String medicinePicPath;
    private String medicineName;
    private Float medicineMood;
    private Float medicineEndu;
    private Float medicineExp;
    private Float medicineHealth;
}
