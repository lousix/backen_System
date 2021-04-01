package backen.service;

import backen.entity.HomeEntity;

import java.util.List;

/**
 * @author 刘智扬
 */
public interface IHomeService {

     List<HomeEntity> selectByType(String type);

}
