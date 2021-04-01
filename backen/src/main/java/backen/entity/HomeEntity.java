package backen.entity;


import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author 刘智扬
 */
@Data
@Entity
@Table(name = "home")
@SQLDelete(sql="update home set is_delete = 1 where id = ?")
@Where(clause = "is_delete = 0")
public class HomeEntity {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "type")
    private String type;

    @Column(name = "content")
    private String content;

}
