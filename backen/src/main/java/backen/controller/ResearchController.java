package backen.controller;

import backen.base.BaseController;
import backen.entity.ResearchEntity;
import backen.repository.ResearchRepository;
import backen.service.IResearchService;
import backen.service.impl.ResearchServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author 刘智扬
 */
@Slf4j
@RestController
@RequestMapping(value = {"/research","/api/research"})
public class ResearchController extends BaseController {

    private IResearchService researchService;

    @Autowired
    public ResearchController(IResearchService researchService) {
        this.researchService = researchService;
    }

    @GetMapping("/getAllResearch")
    public Object getAllResearch(){
        try{
            return response(200,researchService.selectAll());
        }catch(Exception e){
            return response(1002,null);
        }
    }

    @GetMapping("/getById")
    public Object getById(@RequestParam("id") String id){
        try{
            return response(200,researchService.getById(id));
        }catch (Exception e){
            return response(1002,null);
        }
    }

}
