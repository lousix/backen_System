package backen.controller;

import backen.base.BaseController;
import backen.entity.NewsEntity;
import backen.service.INewsService;
import backen.service.impl.NewsServiceImpl;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 刘智扬
 */
@Slf4j
@RestController
@RequestMapping(value = {"/news","/api/news"})
public class NewsController extends BaseController {

    private INewsService newsService;

    @Autowired
    public NewsController(INewsService newsService){
        this.newsService = newsService;
    }

    @GetMapping("/getAllNews")
    public Object getAllNews(@RequestParam("page") int page,@RequestParam("size") int size){
        try{
            Map<String, Object> result = new HashMap<>();
            result.put("data", newsService.select(page,size));
            result.put("total",newsService.getTotal());
            return response(200,result);
        }catch(Exception e){
            return response(1002,null);
        }
    }

}
