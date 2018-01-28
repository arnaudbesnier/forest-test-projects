<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTechnicalDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('cars', function (Blueprint $table) {
        $table->json('information_motor')->nullable();
        // $table->jsonb('information_tires')->nullable();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('cars', function (Blueprint $table) {
        $table->dropColumn('information_motor');
        // $table->dropColumn('information_tires');
      });
    }
}
