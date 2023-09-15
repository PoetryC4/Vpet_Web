package com.pet.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pet.demo.entity.Drink;
import com.pet.demo.entity.Medicine;
import com.pet.demo.mapper.DrinkMapper;
import com.pet.demo.mapper.MedicineMapper;
import com.pet.demo.service.DrinkService;
import com.pet.demo.service.MedicineService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MedicineServiceImpl extends ServiceImpl<MedicineMapper, Medicine> implements MedicineService {


}
