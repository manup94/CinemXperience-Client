# CinemXperience-Client

## Introduction
In this final bootcamp project, we are going to create a website for cinema platforms where users will be able to purchase movie tickets for sessions and also place their food orders. Additionally, the administrator will be able to create movie sessions obtained from an external API and create new food combos. We will be using the technologies React, MongoDB, Express, and Node for this.


## Endpoints we are going to use

Theres are the endpoints that we are going to use in our proyect:

| URL | DESCRIPTION | PROTECTED |
| --- | --- | --- |
| / | Home page |  |
| /sessions | List of available sessions|  |
| session/:id |  Session details|  |
| /session/:id/buy| Buy session | ✅|
| /combos| List of combos | ✅ |
| /order | View shopping - cart| ✅ |
| /login | User login |  |
| /signup | User signup |  |
| /logout | User logout | ✅ |
| /profile| View profile details | ✅ |
| /admin/session/create| Admins create new session | ✅ |
| /admin/session/edit | Admins edit new session| ✅ |
| /admin/session/delete | Admins delete session | ✅ |
| /admin/combo/create | Admin creates a new combo | ✅ |
| /admin/combo/edit| Admin edits a combo | ✅ |
