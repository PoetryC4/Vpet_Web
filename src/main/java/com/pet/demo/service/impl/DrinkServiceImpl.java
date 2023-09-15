package com.pet.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pet.demo.entity.Drink;
import com.pet.demo.mapper.DrinkMapper;
import com.pet.demo.service.DrinkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DrinkServiceImpl extends ServiceImpl<DrinkMapper, Drink> implements DrinkService {


}
