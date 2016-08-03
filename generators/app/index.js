'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.Base.extend({

  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.argument('appname', {type: String, required: false});

    this.option('skip-install', {
      desc: 'Whether dependencies should be installed',
      defaults: false
    });

    this.sourceRoot(path.join(path.dirname(this.resolved), 'templates'));
  },

  prompting: function () {

    this.log(yosay(
      'Welcome to Tony Sneed\'s ' + chalk.yellow('Hello TypeScript') + ' generator!'
    ));

    var dirname = path.basename(process.cwd());
    this.appname = _.kebabCase(dirname);

    var prompts = [{
      type: 'input',
      name: 'appname',
      message: 'Application Name (' + chalk.yellow(this.appname) + ')'
    }];

    return this.prompt(prompts).then(function (props) {
      this.appname = props.appname || this.appname;
    }.bind(this));
  },

  writing: {
    project: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          appname: this.appname
        });
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        {
          appname: this.appname
        });
    },
    files: function () {
    },
    directories: function () {
      this.directory('vscode', '.vscode');
      this.directory('_src', 'src');
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  },

  end: function () {
    this.log(chalk.yellow.bold('Installation successful!'));
  }
});
