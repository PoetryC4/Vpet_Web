package com.pet.demo.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pet.demo.common.R;
import com.pet.demo.entity.Medicine;
import com.pet.demo.entity.PageVO;
import com.pet.demo.service.MedicineService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/medicine")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;


    @PostMapping("/save")
    public R<String> addMedicine(@RequestBody Medicine medicine) {

        if(medicineService.save(medicine))
            return R.success("Y");

        return R.error("N");
    }

    @PostMapping("/page")
    public R<Object> getMedicine(@RequestBody PageVO pageVO) {

        //构造分页构造器
        Page pageInfo = new Page(pageVO.getPage(), pageVO.getPageSize());

        //构造条件构造器
        LambdaQueryWrapper<Medicine> queryWrapper = new LambdaQueryWrapper();
        //添加排序条件
        queryWrapper.orderByAsc(Medicine::getMedicineId);

        //执行查询
        IPage pageRes = medicineService.page(pageInfo,queryWrapper);

        //List<Medicine> medicineRes = pageRes.getRecords();

        return R.success(pageRes);

    }

}
