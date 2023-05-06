| Method | URL | Purpose | Return Codes
| --- | --- | --- | --- |
| `GET` | `/allPreBuiltSounds` | Get all pre-built sounds | 200 |
| `GET` | `/preBuiltSoundsByGenre` | Get all pre-built sounds with a certain genre | 200, 400, 404 |
| `GET` | `/preBuiltSoundInfoByName` | Get info on a single pre-built sound by name | 200, 400, 404 |
| `GET` | `/preBuiltSoundByName` | Get a single pre-built sound by name | 200, 400, 404 |
| `POST` | `/register` | Register a new user | 200, 400 |
| `POST` | `/login` | Log in an existing user | 200, 400, 404 |
| `GET` | `/test` | Test endpoint | 200 |
| `GET` | `/preBuiltSoundTest` | Test return of ResponseEntity&lt;byte[]> | 200 |
| `GET` | `/preBuiltSoundTest2` | Test return of byte[] | 200 |
| `GET` | `/preBuiltSoundTest3` | Test return of ResponseEntity&lt;ArrayList&lt;byte[]>> | 200 |
| `GET` | `/preBuiltSoundTest4` | Test return of ResponseEntity&lt;ByteArrayResource> | 200 |

`GET` `http://.../preBuiltSoundsByGenre?genre=genreName`

- Parameter of the genre name is required and will result in a 400 Bad Request error if not provided

- Error 404 Not Found will be returned if there is no sound in the database that has that genre.

---

`GET` `http://.../preBuiltSoundInfoByName?name=soundName`

- Parameter of the sound name is required and will result in a 400 Bad Request error if not provided

- Error 404 Not Found will be returned if there is no sound in the database that has that name.

---

`GET` `http://.../preBuiltSoundByName?name=soundName`

- Parameter of the sound name is required and will result in a 400 Bad Request error if not provided

- Error 404 Not Found will be returned if there is no sound in the database that has that name.

---

`POST` `http://.../register`

Expected JSON body (Remember Content-Type: application/json in headers)
```
{
    "username": "input_username",
    "password": "input_password",
    --*OPTIONAL*--
    "email": "input_email"
}
```
---

`POST` `http://.../login`

Expected JSON body (Remember Content-Type: application/json in headers)

```
{
    "username": "input_username",
    "password": "input_password"
}
```