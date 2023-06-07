# CinemXperience-Client

## Introduction
In this final bootcamp project, we are going to create a website for cinema platforms where users will be able to purchase movie tickets for sessions and also place their food orders. Additionally, the administrator will be able to create movie sessions obtained from an external API and create new food combos. We will be using the technologies React, MongoDB, Express, and Node for this.


## Endpoints we are going to use

Theres are the endpoints that we are going to use in our proyect:

| URL                       | DESCRIPTION                                                               | PROTECTED |
| ------------------------- | ------------------------------------------------------------------------- | --------- |
| /                         | Index page where users will see the movies that are screening in theaters |           |
| /movies/:movie_id         | Movie that are in theaters details page                                   |           |
| /TopRatedMovieList        | Top rated movie list                                                      |           |
| /TopRatedMovie/:movie_id  | Top rated movie details                                                   |           |
| /signup                   | User signup                                                               |           |
| /login                    | User login                                                                |           |
| /profile                  | View profile details                                                      | ✅         |
| /profile/:profile_id/edit | User edits their profile information                                      | ✅         |
| /admin/pass/create        | Admins create new pass                                                    | ✅         |
| '/admin/pass'             | Pass list                                                                 | ✅         |
| /admin/combo/create       | Admin creates a new combo                                                 | ✅         |
| /combos                   | List of combos                                                            |           |