package backen.service;

import backen.entity.SoftwareEntity;

import java.util.List;

/**
 * @author 刘智扬
 */

public interface ISoftwareService {

    /**
     * 获取 software 信息
     * @param
     * @return
     */
    List<SoftwareEntity> selectAll();

}
