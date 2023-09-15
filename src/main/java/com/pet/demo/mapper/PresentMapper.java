package com.pet.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pet.demo.entity.Medicine;
import com.pet.demo.entity.Present;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PresentMapper extends BaseMapper<Present> {

}
