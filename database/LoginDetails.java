public class LoginDetails
{
	private int _login_ID;
	public int getlogin_ID()
	{
		return this._login_ID;
	}
	public void setlogin_ID(int value)
	{
		this._login_ID = value;
	}

	private String _username;
	public String getusername()
	{
		return this._username;
	}
	public void setusername(String value)
	{
		this._username = value;
	}

	private String _password;
	public String getpassword()
	{
		return this._password;
	}
	public void setpassword(String value)
	{
		this._password = value;
	}


	public LoginDetails(int login_ID_,String username_,String password_)
	{
		this.login_ID = login_ID_;
		this.username = username_;
		this.password = password_;
	}
}