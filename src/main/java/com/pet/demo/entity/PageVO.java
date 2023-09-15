package com.pet.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;

@Data
public class PageVO implements Serializable {

    private Integer page;
    private Integer pageSize;
}
