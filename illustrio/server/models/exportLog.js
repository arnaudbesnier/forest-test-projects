var mongoose = require('mongoose');

var schema = mongoose.Schema({

  timestamp: { type : Date, default: Date.now, index: true },
  free: {type: Boolean, default: true, index: true},

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  userTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }],
  illustration: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Illustration', index: true },
    series: { type: mongoose.Schema.Types.ObjectId, ref: 'Serie' },
    category: Number,
    name: String,
    subcategory: Number,
    style: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    illuType: String
  },
  customization: {
    value: String,
    owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toto: {
      tata: Number
    }
  },
  customization2: {
    value: String,
    owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toto: {
      tata: Number
    }
  },
  customization3: {
    value: String,
    owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toto: {
      tata: Number
    }
  },
  customization4: {
    value: String,
    owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toto: {
      tata: Number
    }
  },
  customization5: {
    value: String,
    owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toto: {
      tata: Number
    }
  },
  customization6: {
    value: String,
    owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toto: {
      tata: Number,
      mob: String,
      customization6: {
        value: String,
        test: {
          test1: Number,
          test2: {
            test3: String,
            test4: {
              test5: Boolean,
              test6: {
                test7: Boolean,
                test8: {
                  test9: String
                }
              }
            }
          }
        },
        owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      }
    }
  },
  customization7: {
    value: String,
    owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toto: {
      tata: Number,
      mob: String,
      customization6: {
        value: String,
        test2: {
          test3: String,
          test4: {
            test5: Boolean,
            test6: {
              test7: Boolean,
              test8: {
                test9: String
              }
            }
          }
        },
        owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      }
    }
  },
  customization8: {
    value: String,
    owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toto: {
      tata: Number,
      mob: String,
      customization6: {
        value: String,
        owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      }
    }
  },
  customization9: {
    value: String,
    owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toto: {
      tata: Number,
      mob: String,
      customization6: {
        value: String,
        test2: {
          test3: String,
          test4: {
            test5: Boolean,
            test6: {
              test7: Boolean,
              test8: {
                test9: String
              }
            }
          }
        },
        owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      }
    }
  },
  customization10: {
    value: String,
    owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toto: {
      tata: Number,
      mob: String,
      customization6: {
        value: String,
        test2: {
          test3: String,
          test4: {
            test5: Boolean,
            test6: {
              test7: Boolean,
              test8: {
                test9: String
              }
            }
          }
        },
        owner2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      }
    }
  },
  tutu: [Number],
  exportOptions: {},
  url: String,
  email: String,
  email_auth0: String,
  auth0_user_id: String,
  messenger: {
      linked: Boolean,
      referral: {
          to: [],
          by: []
      }
  },
  notifications: {
      email: String,
      messenger: String
  },
  demarches: [{
      type: String,
      id: String
  }],
  bot: {
      step: Number
  },
  origin: String,
  civilite: String,
  logement: {
      colocs: [],
      preavis: {
          motif: String
      }
  },
  situation: {
      familiale: {
          enfants_moins_21_charge: Number,
          parents_ages_charge: Number
      }
  },
  conjoint: {
      situation: {
          familiale: {
              enfants_moins_21_charge: Number,
              parents_ages_charge: Number
          }
      },
      salaires_precedent: {
          total: Number,
          frais_reels_deductibles: Number,
          indemnites_journalieres_secu_pro: Number,
          allocs_chommage: Number
      },
      revenus: {
          pensions_alim_recu: Number,
          retraite_pensions_rentes: Number,
          revenus_non_salaries: Number,
          deficit_pro: Number,
          revenu_foncier: Number,
          deficit_foncier: Number,
          autres_revenus: Number
      },
      charges: {
          pensions_alim_versees: Number,
          csg_deductibles: Number,
          epargne_retraite_cotisations_secu: Number
      },
      patrimoine: {
          mobilier: {
              valeur_mobiliere: Number
          },
          immobilier: {
              valeur_estime_bati: Number,
              valeur_locative_brut: Number,
              valeur_estime_non_bati: Number,
              valeur_bases_terres: Number
          }
      }
  },
  salaires_precedent: {
      total: Number,
      frais_reels_deductibles: Number,
      indemnites_journalieres_secu_pro: Number,
      allocs_chommage: Number
  },
  revenus: {
      pensions_alim_recu: Number,
      retraite_pensions_rentes: Number,
      revenus_non_salaries: Number,
      deficit_pro: Number,
      revenu_foncier: Number,
      deficit_foncier: Number,
      autres_revenus: Number
  },
  charges: {
      pensions_alim_versees: Number,
      csg_deductibles: Number,
      epargne_retraite_cotisations_secu: Number
  },
  patrimoine: {
      mobilier: {
          valeur_mobiliere: Number
      },
      immobilier: {
          valeur_estime_bati: Number,
          valeur_locative_brut: Number,
          valeur_estime_non_bati: Number,
          valeur_bases_terres: Number
      }
  }
});

module.exports = mongoose.model('ExportLog', schema);
