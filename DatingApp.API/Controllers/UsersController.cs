using System.Threading.Tasks;
using DatingApp.API.Data;
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

    // ================================================
    // =             CONSTRUCTOR SECTION              =
    // ================================================

    public UsersController(IDatingRepository repo)
    {
      _repo = repo;
    }


    // ================================================
    // =              BUSINESS METHODS                =
    // ================================================

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _repo.GetUsers();

        return Ok(users);
    }

    [HttpGet]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _repo.GetUser(id);

        return Ok(user);
    }
  }
}