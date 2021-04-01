package backen.controller;

import backen.base.BaseController;
import backen.entity.PublicationEntity;
import backen.service.IPublicationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 刘智扬
 */
@Slf4j
@RestController
@RequestMapping(value = {"/publication","/api/publication"})
public class PublicationController extends BaseController {

    private IPublicationService publicationService;

    @Autowired
    public PublicationController(IPublicationService publicationService){
        this.publicationService = publicationService;
    }

    @GetMapping("/getAllPublication")
    public Object getAllPublication(@RequestParam(value = "select",defaultValue = "0") int select , @RequestParam(value = "method",defaultValue = "0") int method, @RequestParam(value = "range",defaultValue = "all") String range){
        try{
            return response(200,publicationService.selectAll(select,method,range));
        }catch (Exception e){
            return response(1002,null);
        }
    }

    @GetMapping("/getById")
    public Object getById(@RequestParam("id") String id){
        try{
            return response(200,publicationService.selectById(id));
        }catch (Exception e){
            return response(1002,null);
        }
    }

}
