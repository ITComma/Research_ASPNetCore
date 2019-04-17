using System;
using System.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace DatingApp.API
{
  public class Program
  {
    public static void Main(string[] args)
    {
      CreateWebHostBuilder(args).Build().Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args)
    {
      var assemblyName = typeof(Startup).GetTypeInfo().Assembly.FullName;

      return WebHost.CreateDefaultBuilder(args)
        // .ConfigureAppConfiguration((hostingContext, config) =>
        //     {
        //       config.SetBasePath(Directory.GetCurrentDirectory());
        //       if (args.Length >= 1 && args[0] == "logix")
        //       {
        //         System.Console.WriteLine("config logix");
        //         config.AddJsonFile("config.Logixtek.json", optional: true, reloadOnChange: true);
        //       }
        //       else
        //       {
        //         System.Console.WriteLine("config mac");
        //         config.AddJsonFile("config.Mac.json", optional: true, reloadOnChange: true);
        //       }
        //     })
        .UseStartup(assemblyName);
    }
  }
}
