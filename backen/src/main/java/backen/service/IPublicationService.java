package backen.service;

import backen.entity.PublicationEntity;
import backen.entity.RPublicationEntity;

import java.time.Year;
import java.util.List;

/**
 * @author 刘智扬
 */

public interface IPublicationService {

    /**
     * 获取 patent 信息
     * @param select
     * @param method
     * @param range
     * @return
     */
    List<List<RPublicationEntity>> selectAll(int select, int method, String range);

    PublicationEntity selectById(String id);
}

