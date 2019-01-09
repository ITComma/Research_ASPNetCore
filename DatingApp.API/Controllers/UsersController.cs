using System.Collections.Generic;
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
  }
}