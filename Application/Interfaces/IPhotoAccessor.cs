using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file); // dodaje sliku na cloud
        
        Task<string> DeletePhoto(string publicId); // mozda pascal case - metoda koja brise sliku sa clouda

        
    }
}