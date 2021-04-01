package backen.repository;

import backen.entity.NewsEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 刘智扬
 */

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity,Long> {

    /**
     * 通过 id 寻找 news 的信息
     * @param id
     * @return
     */
    NewsEntity findById(String id);

    /**
     * 通过 id 寻找 news 的信息
     * @param pageable
     * @return
     */
    @Query("select e from NewsEntity e ")
    List<NewsEntity> getNews(Pageable pageable);


    /**
     * 通过 id 寻找 news 的信息
     * @param sort
     * @return
     */
    @Query("select e from NewsEntity e ")
    List<NewsEntity> getNews(Sort sort);

    @Query("select count(e) from NewsEntity e")
    int getTotal();


}
