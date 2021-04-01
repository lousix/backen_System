package backen.controller;

import backen.base.BaseController;
import backen.entity.NewsEntity;
import backen.service.IHomeService;
import backen.service.INewsService;
import backen.service.impl.NewsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 刘智扬
 */
@Slf4j
@RestController
@RequestMapping(value = {"/home","/api/home"})
public class HomeController extends BaseController{

    private INewsService newsService;
    private IHomeService homeService;

    @Autowired
    public HomeController(INewsService newsService,IHomeService homeService){
        this.newsService = newsService;
        this.homeService = homeService;
    }


    @GetMapping("/getNews")
    public Object getNews(@RequestParam("num") int n){
        try{
            return response(200,newsService.select(n));
        }catch(Exception e){
            return response(1002,null);
        }
    }

    @GetMapping("/getPic")
    public Object getPic(){
        try{
            return response(200,homeService.selectByType("picture"));
        }catch(Exception e){
            return response(1002,null);
        }
    }

    @GetMapping("/getVideo")
    public Object getVideo(){
        try{
            return response(200,homeService.selectByType("video"));
        }catch(Exception e){
            return response(1002,null);
        }
    }

    @GetMapping("/getDescription")
    public Object getDescription(){
        try{
            return response(200,homeService.selectByType("description"));
        }catch(Exception e){
            return response(1002,null);
        }
    }

    @GetMapping("/getAdmissions")
    public Object getAdmissions(){
        try{
            return response(200,homeService.selectByType("admissions"));
        }catch(Exception e){
            return response(1002,null);
        }
    }
}
