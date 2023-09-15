package com.pet.demo.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pet.demo.common.R;
import com.pet.demo.entity.Food;
import com.pet.demo.entity.PageVO;
import com.pet.demo.service.FoodService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/food")
public class FoodController {

    @Autowired
    private FoodService foodService;


    @PostMapping("/save")
    public R<String> addFood(@RequestBody Food food) {

        if(foodService.save(food))
            return R.success("Y");

        return R.error("N");
    }

    @PostMapping("/page")
    public R<Object> getFood(@RequestBody PageVO pageVO) {

        //构造分页构造器
        Page pageInfo = new Page(pageVO.getPage(), pageVO.getPageSize());

        //构造条件构造器
        LambdaQueryWrapper<Food> queryWrapper = new LambdaQueryWrapper();
        //添加排序条件
        queryWrapper.orderByAsc(Food::getFoodId);

        //执行查询
        IPage pageRes = foodService.page(pageInfo,queryWrapper);

        //List<Food> foodRes = pageRes.getRecords();

        return R.success(pageRes);

    }

}
