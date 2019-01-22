using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
  [ServiceFilter(typeof(LogUserActivity))]
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
    public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
    {
      var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
      var userFormRepo = await _repo.GetUser(currentUserId);
      userParams.UserId = currentUserId;
      if(string.IsNullOrEmpty(userParams.Gender)) {
        userParams.Gender = userFormRepo.Gender == "male" ? "female" : "male";
      }

      var users = await _repo.GetUsers(userParams);

      var resultUsers = _mapper.Map<IEnumerable<UserForListDto>>(users);

      Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalCount);

      return Ok(resultUsers);
    }

    [HttpGet("{id}", Name = "GetUser")]
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
