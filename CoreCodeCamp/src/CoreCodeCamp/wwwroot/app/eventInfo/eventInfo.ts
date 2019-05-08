﻿///<reference path="../common/dataService.ts" />
namespace CodeCamp {

  // External JS Libraries
  declare var Vue: any;
  declare var moment: any;
  declare var jQuery: any;

  export function eventInfo() {
    CodeCamp.App.bootstrap(CodeCamp.EventInfoView);
  }

  export let EventInfoView = {
    el: "#event-info-view",
    data: {
      busy: true,
      theEvent: {},
      errorMessage: "",
      eventMessage: "",
      locationMessage: "",
      rooms: [],
      timeSlots: [],
      tracks: [],
      newRoom: "",
      newTrack: "",
      newTimeSlot: ""
    },
    methods: {
      onSaveEvent() {
        this.$validator.validateAll("theEvent").then(result => {
          if (result) {
            this.busy = true;
            this.errorMessage = "";
            this.eventMessage = "Please Wait...";
            CodeCamp.Common.dataService.saveEventInfo(this.theEvent).then(function () {
              this.eventMessage = "Saved...";
            }.bind(this), function () {
              this.eventMessage = "Failed to save changes...";
            }.bind(this)).finally(() => this.busy = false).bind(this);
          }
        }, function () { this.eventMessage = "Please fix any validation errors..."; });
        return false;
      },
      onSaveLocation() {
        this.$validator.validateAll("vLocation").then(result => {
          if (result) {
            this.busy = true;
            this.errorMessage = "";
            this.locationMessage = "";
            CodeCamp.Common.dataService.saveEventLocation(this.theEvent.location).then(function () {
              this.locationMessage = "Saved...";
            }, function () {
              this.locationMessage = "Failed to save changes...";
            }).finally(() => this.busy = false);
          }
        });
        return false;
      },
      onSaveTrack() {
        this.busy = true;
        this.errorMessage = "";
        CodeCamp.Common.dataService.saveTrack(this.newTrack)
          .then((result) => {
            this.tracks.push(result.data);
            this.newTrack = "";
          }, () => this.errorMessage = "Failed to save track")
          .finally(() => this.busy = false);
      },

      onSaveRoom() {
        this.busy = true;
        this.errorMessage = "";
        CodeCamp.Common.dataService.saveRoom(this.newRoom)
          .then((result) => {
            this.rooms.push(result.data);
            this.newRoom = "";
          }, (e) => {
            this.errorMessage = "Failed to save room";
          }).finally(() => this.busy = false);
      },
      onSaveTimeSlot() {
        this.busy = true;
        this.errorMessage = "";
        CodeCamp.Common.dataService.saveTimeSlot(this.newTimeSlot)
          .then((result) => {
            this.timeSlots.push(result.data);
            this.newTimeSlot = "";
          }, (e) => {
            this.errorMessage = "Failed to save timeslot";
          }).finally(() => this.busy = false);
      },

      onDeleteTrack(track: any) {
        this.busy = true;
        this.errorMessage = "";
        CodeCamp.Common.dataService.deleteTrack(track)
          .then(() => this.tracks.splice(this.tracks.indexOf(track), 1),
          () => this.errorMessage = "Failed to delete track")
          .finally(() => this.busy = false);
      },

      onDeleteRoom(room: any) {
        this.busy = true;
        this.errorMessage = "";
        CodeCamp.Common.dataService.deleteRoom(room)
          .then(result => {
            this.rooms.splice(this.rooms.indexOf(room), 1);
          }, e => this.errorMessage = "Failed to delete room")
          .finally(() => this.busy = false);
      },

      onDeleteTimeSlot(timeSlot: any) {
        this.busy = true;
        this.errorMessage = "";
        CodeCamp.Common.dataService.deleteTimeSlot(timeSlot)
          .then(result => {
            this.timeSlots.splice(this.timeSlots.indexOf(timeSlot), 1);
          }, e => this.errorMessage = "Failed to delete timeslot")
          .finally(() => this.busy = false);
      }
    },
    computed: {
    },
    mounted() {
      Vue.Promise.all([
        CodeCamp.Common.dataService.getEventInfo(),
        CodeCamp.Common.dataService.getTimeSlots(),
        CodeCamp.Common.dataService.getRooms(),
        CodeCamp.Common.dataService.getTracks()
      ])
        .then(function (result) {
          this.theEvent = result[0].data;
          this.timeSlots = result[1].data;
          this.rooms = result[2].data;
          this.tracks = result[3].data;
        }.bind(this), function () {
          this.errorMessage = "Failed to load data";
        }.bind(this))
        .finally(function () {
          this.busy = false;
          this.$validator.validateAll('vEvent').then(() => { }).catch(() => { });
          this.$validator.validateAll('vLocation').then(() => { }).catch(() => { });
        }.bind(this));

    }
  };
}

