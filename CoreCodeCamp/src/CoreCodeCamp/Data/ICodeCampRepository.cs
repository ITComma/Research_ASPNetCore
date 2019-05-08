﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoreCodeCamp.Data.Entities;
using CoreCodeCamp.Models;

namespace CoreCodeCamp.Data
{
  public interface ICodeCampRepository
  {
    IEnumerable<CodeCampUser> GetUsers();
    IEnumerable<Talk> GetUserWithFavoriteTalksForEvent(string name, string moniker);

    IEnumerable<EventInfo> GetAllEventInfo();
    EventInfo GetEventInfo(string moniker);
    EventInfo GetCurrentEvent();

    IEnumerable<Sponsor> GetSponsors(string moniker);
    Sponsor GetSponsor(int id);

    IEnumerable<Speaker> GetSpeakers(string moniker);
    Speaker GetSpeakerForCurrentUser(string moniker, string name);
    Speaker MigrateSpeakerForCurrentUser(string moniker, CodeCampUser user);
    Speaker GetSpeaker(int id);
    Speaker GetSpeakerByName(string moniker, string name);

    IEnumerable<Room> GetRooms(string moniker);
    Room GetRoom(string moniker, int id);

    IEnumerable<Tuple<Talk, int>> GetTalkCounts(string moniker);

    IEnumerable<Track> GetTracks(string moniker);
    Track GetTrack(string moniker, int id);

    IEnumerable<TimeSlot> GetTimeSlots(string moniker);
    TimeSlot GetTimeSlot(string moniker, int id);

    IEnumerable<Talk> GetTalks(string moniker);
    Talk GetTalk(int id);
    bool ToggleTalkForUser(string moniker, string userName, int talkId);
    List<IEnumerable<ScheduleModel>> GetTalksInSlots(string moniker);

    void AddOrUpdate(object entity);
    void Delete(object entity);
    Task<int> SaveChangesAsync();
  }
}