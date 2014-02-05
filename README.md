# grunt-sp_module

> Automatic generation of Elements.xml and SharePointProjectItem.spdata files for SharePoint Modules


## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sp_module --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sp_module');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-clean/tree/grunt-0.3-stable).*


## sp_module task
_Run this task with the `grunt sp_module` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Usage Examples

Assume we have this file structure for `myModule/`

```
myModule/
|
|- foo.html
|
+- bar/
    |
    +- baz.html
```

and configure the `sp_module` task like:

```js
sp_module: {
  myModule: {
    options: {
      name: 'myModuleName'
    },
    files: [{
      cwd: 'myModule',
      src: "{,*/}*.*"
    }]
  }
}
```

This will create the following files in `myModule/`

  * Elements.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
  <Module Name="myModule">
    <File Path="myModule\foo.html" Url="myModule\foo.html" ReplaceContent="TRUE"/>
    <File Path="myModule\bar\baz.html" Url="myModule\bar\baz.html" ReplaceContent="TRUE"/>
  </Module>
</Elements>
```

  * SharePointProjectItem.spdata

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ProjectItem xmlns="http://schemas.microsoft.com/VisualStudio/2010/SharePointTools/SharePointProjectItemModel" Type="Microsoft.VisualStudio.SharePoint.Module" DefaultFile="Elements.xml" SupportedTrustLevels="All" SupportedDeploymentScopes="Web, Site">
  <Files>
    <ProjectItemFile Source="Elements.xml" Target="myModule\" Type="ElementManifest"/>
    <ProjectItemFile Source="foo.html" Target="myModule\" Type="ElementFile"/>
    <ProjectItemFile Source="bar\baz.html" Target="myModule\bar\" Type="ElementFile"/>
  </Files>
</ProjectItem>
```
