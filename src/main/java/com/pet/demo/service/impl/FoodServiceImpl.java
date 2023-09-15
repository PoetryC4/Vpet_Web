package com.pet.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pet.demo.entity.Food;
import com.pet.demo.mapper.FoodMapper;
import com.pet.demo.service.FoodService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class FoodServiceImpl extends ServiceImpl<FoodMapper, Food> implements FoodService {


}
