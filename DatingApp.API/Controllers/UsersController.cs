using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    // ================================================
    // =              ATTRIBUTES SECTION              =
    // ================================================

    private readonly IDatingRepository _repo;

    private readonly IMapper _mapper;


    // ================================================
    // =             CONSTRUCTOR SECTION              =
    // ================================================

    public UsersController(IDatingRepository repo, IMapper mapper)
    {
      _mapper = mapper;
      _repo = repo;
    }


    // ================================================
    // =              BUSINESS METHODS                =
    // ================================================

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
      var users = await _repo.GetUsers();

      var resultUsers = _mapper.Map<IEnumerable<UserForListDto>>(users);

      return Ok(resultUsers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
      var user = await _repo.GetUser(id);

      var resultUser = _mapper.Map<UserForDetailedDto>(user);

      return Ok(resultUser);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
    {
      if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
        return Unauthorized();
      }

      var userFromRepo = await _repo.GetUser(id);

      _mapper.Map(userForUpdateDto, userFromRepo);

      if (await _repo.SaveAll())
      {
          return NoContent();
      }

      throw new Exception($"Updating user {id} faled on server");
    }
  }
}