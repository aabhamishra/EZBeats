package cs506.sampler.repository;

import cs506.sampler.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<UsersEntity, Integer>{
    @Query("SELECT p FROM UsersEntity p WHERE p.username = :username")
    UsersEntity findByUsername(@Param("username") String username);

    @Query("SELECT p FROM UsersEntity p WHERE p.email = :email")
    UsersEntity findByEmail(@Param("email") String email);

    @Query("SELECT p FROM UsersEntity p WHERE p.password = :password")
    UsersEntity findByPassword(@Param("password") String password);

    @Query("SELECT p FROM UsersEntity p WHERE p.username = :username AND p.password = :password")
    UsersEntity findByUsernameAndPassword(String username, String password);
}