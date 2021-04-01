package backen.controller;

import backen.base.BaseController;
import backen.entity.SoftwareEntity;
import backen.service.ISoftwareService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author 刘智扬
 */
@Slf4j
@RestController
@RequestMapping(value = {"/software","/api/software"})
public class SoftwareController extends BaseController {

    private ISoftwareService softwareService;

    @Autowired
    public SoftwareController(ISoftwareService softwareService){
        this.softwareService = softwareService;
    }

    @GetMapping("/getAllSoftware")
    public Object getAllSoftware(){
        try{
            return response(200,softwareService.selectAll());
        }catch(Exception e){
            return response(1002,null);
        }
    }

}
