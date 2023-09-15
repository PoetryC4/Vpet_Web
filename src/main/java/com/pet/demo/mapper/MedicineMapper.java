package com.pet.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pet.demo.entity.Food;
import com.pet.demo.entity.Medicine;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MedicineMapper extends BaseMapper<Medicine> {

}
