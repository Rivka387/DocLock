using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.IServices;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DocLock.Service.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // פונקציה ליצירת טוקן עם תוקף של 30 דקות
        public string GenerateJwtToken(string username, string[] roles)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["KEY"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // מזהה ייחודי לכל טוקן
            };

            // הוספת תפקידים כ-Claims
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30), // הטוקן תקף ל-30 דקות
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // פונקציה לאימות ופירוק טוקן
        public ClaimsPrincipal ValidateToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["KEY"]);

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true, // בדיקת תוקף הטוקן
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero // ביטול זמן חיץ שמוסיף ASP.NET (למניעת עיכוב)
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);

                // בדיקה שהטוקן חתום כראוי
                if (!(validatedToken is JwtSecurityToken jwtToken) ||
                    !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new SecurityTokenException("Invalid token");
                }

                return principal;
            }
            catch
            {
                return null; // במקרה של טוקן לא תקין, מחזירים null
            }
        }

        // פונקציה לבדיקה האם הטוקן פג תוקף
        public bool IsTokenExpired(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadToken(token) as JwtSecurityToken;

            if (jwtToken == null)
                return true;

            return jwtToken.ValidTo < DateTime.UtcNow;
        }

        // פונקציה להנפקת טוקן חדש אם הטוקן הישן פג תוקף
        public string RefreshToken(string token)
        {
            var principal = ValidateToken(token);
            if (principal == null || !IsTokenExpired(token))
                return null; // אם הטוקן עדיין תקף, אין צורך לרענן

            var username = principal.Identity.Name;
            var roles = principal.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToArray();

            return GenerateJwtToken(username, roles); // יצירת טוקן חדש
        }

        // פונקציה לבדיקת האם המשתמש הוא אדמין
        public bool IsUserAdmin(string token)
        {
            var principal = ValidateToken(token);
            if (principal == null)
                return false;
            return principal.Claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "Admin");
        }

        // פונקציה לבדיקת האם המשתמש הוא יוזר
        public bool IsUser(string token)
        {
            var principal = ValidateToken(token);
            if (principal == null)
                return false;

            return principal.Claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "User");

        }
    }
}