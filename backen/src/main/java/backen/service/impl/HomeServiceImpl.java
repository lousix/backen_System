package backen.service.impl;

import backen.entity.HomeEntity;
import backen.repository.HomeRepository;
import backen.service.IHomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * @author 刘智扬
 */
@Service
public class HomeServiceImpl implements IHomeService {

    private HomeRepository homeRepository;

    @Autowired
    public HomeServiceImpl(HomeRepository homeRepository){
        this.homeRepository = homeRepository;
    }

    @Override
    public List<HomeEntity> selectByType(String type) {
        return homeRepository.findByType(type);
    }
}
