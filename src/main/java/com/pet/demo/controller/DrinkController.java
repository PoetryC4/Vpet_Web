package com.pet.demo.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pet.demo.common.R;
import com.pet.demo.entity.Drink;
import com.pet.demo.entity.Food;
import com.pet.demo.entity.PageVO;
import com.pet.demo.service.DrinkService;
import com.pet.demo.service.FoodService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/drink")
public class DrinkController {

    @Autowired
    private DrinkService drinkService;


    @PostMapping("/save")
    public R<String> addDrink(@RequestBody Drink drink) {

        if(drinkService.save(drink))
            return R.success("Y");

        return R.error("N");
    }

    @PostMapping("/page")
    public R<Object> getDrink(@RequestBody PageVO pageVO) {

        //构造分页构造器
        Page pageInfo = new Page(pageVO.getPage(), pageVO.getPageSize());

        //构造条件构造器
        LambdaQueryWrapper<Drink> queryWrapper = new LambdaQueryWrapper();
        //添加排序条件
        queryWrapper.orderByAsc(Drink::getDrinkId);

        //执行查询
        IPage pageRes = drinkService.page(pageInfo,queryWrapper);

        //List<Food> drinkRes = pageRes.getRecords();

        return R.success(pageRes);

    }

}
