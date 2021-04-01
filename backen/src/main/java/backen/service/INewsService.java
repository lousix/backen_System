package backen.service;

import backen.entity.NewsEntity;

import java.util.List;
/**
 * @author 刘智扬
 */

public interface INewsService {

    /**
     * 获取部分 news 信息
     * @param n
     * @return
     */
    List<NewsEntity> select(int n);

    /**
     * 获取部分 news 信息
     * @param
     * @return
     */
    List<NewsEntity> select(int page,int size);

    int getTotal();


}
