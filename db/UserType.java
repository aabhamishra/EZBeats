import java.sql.*;
import java.sql.PreparedStatement;
import java.sql.sql.ResultSet;
import java.sql.connectionFactory;
import java.sql.Connection;

public class UserType{

	private int type_ID;
    private String type_name;

    private JDBCConnectionMaker connectionFactory;
    Connection con;

	public int gettype_ID(){
		return this.type_ID;
	}
	public void settype_ID(int value){
		this.type_ID = value;
	}

	
	public String gettype_name(){
		return this.type_name;
	}
	public void settype_name(String value)
	{
		this.type_name = value;
	}

    private boolean create(){
        if(connectionFactory == null){
            return false;
        }
        else{
            String sqladd = "INSERT into User Type values (?,?)";
            PreparedStatement pst = con.prepareStatement(sqladd);
            pst.setInt(1, type_ID);
            pst.setString(2, type_name);
            pst.Execute();

            return true;
        }
        
    }
    private boolean read(){
        if(connectionFactory == null){
            return false;
        }
        else{
            String sqlread = "SELECT * from User Type where type_ID = ?";
            PreparedStatement pst = con.prepareStatement(sqlread);
            pst.setInt(1, type_ID);
            ResultSet rs = pst.executeQuery();
            if(rs.next()){
                String add1 = rs.getInt("type_ID");
                String add2 = rs.getString("type_name");
                pst.close();
                rs.close();
            }
            return true;

        }
    }


	public UserType(int type_ID_,String type_name_){
		this.type_ID = type_ID;
		this.type_name = type_name;
	}
}