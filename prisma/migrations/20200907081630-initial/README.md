# Migration `20200907081630-initial`

This migration has been generated by Dane Harnett at 9/7/2020, 6:16:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Habit" (
"id" SERIAL,
"name" text   NOT NULL ,
"goal" integer   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."HabitLog" (
"id" SERIAL,
"habitId" integer   NOT NULL ,
"dateLogged" text   NOT NULL ,
"count" integer   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."HabitLog" ADD FOREIGN KEY ("habitId")REFERENCES "public"."Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200907081630-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,26 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Habit {
+  id    Int @default(autoincrement()) @id
+  name String
+  goal Int
+  userId String
+}
+
+model HabitLog {
+   id    Int @default(autoincrement()) @id
+   habit Habit @relation(fields: [habitId], references: [id])
+   habitId Int
+   dateLogged String
+   count Int
+}
```

