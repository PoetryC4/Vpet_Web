package com.pet.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pet.demo.entity.Medicine;
import com.pet.demo.entity.Present;
import com.pet.demo.mapper.MedicineMapper;
import com.pet.demo.mapper.PresentMapper;
import com.pet.demo.service.MedicineService;
import com.pet.demo.service.PresentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PresentServiceImpl extends ServiceImpl<PresentMapper, Present> implements PresentService {


}
