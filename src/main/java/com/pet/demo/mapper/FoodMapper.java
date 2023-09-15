package com.pet.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pet.demo.entity.Food;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FoodMapper extends BaseMapper<Food> {

}
