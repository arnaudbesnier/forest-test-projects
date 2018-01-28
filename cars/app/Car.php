<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
  protected $casts = [
      'information_motor' => 'array',
  ];

  public function owner()
  {
      return $this->belongsTo('App\User', 'user_id');
  }
}
