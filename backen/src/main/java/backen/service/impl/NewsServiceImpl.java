package backen.service.impl;

import backen.entity.NewsEntity;

import backen.repository.NewsRepository;
import backen.repository.ResearchRepository;
import backen.service.INewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
/**
 * @author 刘智扬
 */
@Service
public class NewsServiceImpl implements INewsService {

    private NewsRepository newsRepository;

    @Autowired
    public NewsServiceImpl(NewsRepository newsRepository){
        this.newsRepository = newsRepository;
    }

    @Override
    public List<NewsEntity> select(int n) {
        Pageable pageable = new PageRequest(0,n, Sort.Direction.DESC,"date");
        return newsRepository.getNews(pageable);
    }

    @Override
    public List<NewsEntity> select(int page,int size) {
        Sort sort = new Sort(Sort.Direction.DESC,"date");
        Pageable pageable = new PageRequest(page-1,size,sort);
        return newsRepository.getNews(pageable);
    }

    @Override
    public int getTotal() {
        return newsRepository.getTotal();
    }
}
