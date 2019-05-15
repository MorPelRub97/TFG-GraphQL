import { insertUtilities, queryUtilities, projectUtilities, updateUtilities, processHook, dbHelpers, resolverHelpers } from "mongo-graphql-starter";
import hooksObj from "../hooks";
const runHook = processHook.bind(this, hooksObj, "Course")
const { decontructGraphqlQuery, cleanUpResults } = queryUtilities;
const { setUpOneToManyRelationships, newObjectFromArgs } = insertUtilities;
const { getMongoProjection, parseRequestedFields } = projectUtilities;
const { getUpdateObject, setUpOneToManyRelationshipsForUpdate } = updateUtilities;
import { ObjectId } from "mongodb";
import CourseMetadata from "./Course";

export async function loadCourses(db, queryPacket, root, args, context, ast) {
  let { $match, $project, $sort, $limit, $skip } = queryPacket;

  let aggregateItems = [
    { $match }, 
    $sort ? { $sort } : null, 
    { $project },
    $skip != null ? { $skip } : null, 
    $limit != null ? { $limit } : null
  ].filter(item => item);

  await processHook(hooksObj, "Course", "queryPreAggregate", aggregateItems, { db, root, args, context, ast });
  let Courses = await dbHelpers.runQuery(db, "courses", aggregateItems);
  await processHook(hooksObj, "Course", "adjustResults", Courses);
  Courses.forEach(o => {
    if (o._id){
      o._id = "" + o._id;
    }
  });
  cleanUpResults(Courses, CourseMetadata);
  return Courses;
}

export const Course = {


}

export default {
  Query: {
    async getCourse(root, args, context, ast) {
      let db = await (typeof root.db === "function" ? root.db() : root.db);
      await runHook("queryPreprocess", { db, root, args, context, ast });
      context.__mongodb = db;
      let queryPacket = decontructGraphqlQuery(args, ast, CourseMetadata, "Course");
      await runHook("queryMiddleware", queryPacket, { db, root, args, context, ast });
      let results = await loadCourses(db, queryPacket, root, args, context, ast);

      return {
        Course: results[0] || null
      };
    },
    async allCourses(root, args, context, ast) {
      let db = await (typeof root.db === "function" ? root.db() : root.db);
      await runHook("queryPreprocess", { db, root, args, context, ast });
      context.__mongodb = db;
      let queryPacket = decontructGraphqlQuery(args, ast, CourseMetadata, "Courses");
      await runHook("queryMiddleware", queryPacket, { db, root, args, context, ast });
      let result = {};

      if (queryPacket.$project) {
        result.Courses = await loadCourses(db, queryPacket, root, args, context, ast);
      }

      if (queryPacket.metadataRequested.size) {
        result.Meta = {};

        if (queryPacket.metadataRequested.get("count")) {
          let countResults = await dbHelpers.runQuery(db, "courses", [{ $match: queryPacket.$match }, { $group: { _id: null, count: { $sum: 1 } } }]);  
          result.Meta.count = countResults.length ? countResults[0].count : 0;
        }
      }

      return result;
    }
  },
  Mutation: {
    async createCourse(root, args, context, ast) {
      let gqlPacket = { root, args, context, ast, hooksObj };
      let { db, session, transaction } = await resolverHelpers.startDbMutation(gqlPacket, "Course", CourseMetadata, { create: true });
      return await resolverHelpers.runMutation(session, transaction, async() => {
        let newObject = await newObjectFromArgs(args.Course, CourseMetadata, { ...gqlPacket, db, session });
        let requestMap = parseRequestedFields(ast, "Course");
        let $project = requestMap.size ? getMongoProjection(requestMap, CourseMetadata, args) : null;

        newObject = await dbHelpers.processInsertion(db, newObject, { ...gqlPacket, typeMetadata: CourseMetadata, session });
        if (newObject == null) {
          return { Course: null };
        }
        await setUpOneToManyRelationships(newObject, args.Course, CourseMetadata, { ...gqlPacket, db, session });
        await resolverHelpers.mutationComplete(session, transaction);

        let result = $project ? (await loadCourses(db, { $match: { _id: newObject._id }, $project, $limit: 1 }, root, args, context, ast))[0] : null;
        return resolverHelpers.mutationSuccessResult({ Course: result, transaction, elapsedTime: 0 });
      });
    },
    async updateCourse(root, args, context, ast) {
      let gqlPacket = { root, args, context, ast, hooksObj };
      let { db, session, transaction } = await resolverHelpers.startDbMutation(gqlPacket, "Course", CourseMetadata, { update: true });
      return await resolverHelpers.runMutation(session, transaction, async() => {
        let { $match, $project } = decontructGraphqlQuery(args._id ? { _id: args._id } : {}, ast, CourseMetadata, "Course");
        let updates = await getUpdateObject(args.Updates || {}, CourseMetadata, { ...gqlPacket, db, session });

        if (await runHook("beforeUpdate", $match, updates, { ...gqlPacket, db, session }) === false) {
          return { Course: null };
        }
        if (!$match._id) {
          throw "No _id sent, or inserted in middleware";
        }
        await setUpOneToManyRelationshipsForUpdate([args._id], args, CourseMetadata, { ...gqlPacket, db, session });
        await dbHelpers.runUpdate(db, "courses", $match, updates, { session });
        await runHook("afterUpdate", $match, updates, { ...gqlPacket, db, session });
        await resolverHelpers.mutationComplete(session, transaction);
        
        let result = $project ? (await loadCourses(db, { $match, $project, $limit: 1 }, root, args, context, ast))[0] : null;
        return resolverHelpers.mutationSuccessResult({ Course: result, transaction, elapsedTime: 0 });
      });
    },
    async updateCourses(root, args, context, ast) {
      let gqlPacket = { root, args, context, ast, hooksObj };
      let { db, session, transaction } = await resolverHelpers.startDbMutation(gqlPacket, "Course", CourseMetadata, { update: true });
      return await resolverHelpers.runMutation(session, transaction, async() => {
        let { $match, $project } = decontructGraphqlQuery({ _id_in: args._ids }, ast, CourseMetadata, "Courses");
        let updates = await getUpdateObject(args.Updates || {}, CourseMetadata, { ...gqlPacket, db, session });

        if (await runHook("beforeUpdate", $match, updates, { ...gqlPacket, db, session }) === false) {
          return { success: true };
        }
        await setUpOneToManyRelationshipsForUpdate(args._ids, args, CourseMetadata, { ...gqlPacket, db, session });
        await dbHelpers.runUpdate(db, "courses", $match, updates, { session });
        await runHook("afterUpdate", $match, updates, { ...gqlPacket, db, session });
        await resolverHelpers.mutationComplete(session, transaction);
        
        let result = $project ? await loadCourses(db, { $match, $project }, root, args, context, ast) : null;
        return resolverHelpers.mutationSuccessResult({ Courses: result, transaction, elapsedTime: 0 });
      });
    },
    async updateCoursesBulk(root, args, context, ast) {
      let gqlPacket = { root, args, context, ast, hooksObj };
      let { db, session, transaction } = await resolverHelpers.startDbMutation(gqlPacket, "Course", CourseMetadata, { update: true });
      return await resolverHelpers.runMutation(session, transaction, async() => {
        let { $match } = decontructGraphqlQuery(args.Match, ast, CourseMetadata);
        let updates = await getUpdateObject(args.Updates || {}, CourseMetadata, { ...gqlPacket, db, session });

        if (await runHook("beforeUpdate", $match, updates, { ...gqlPacket, db, session }) === false) {
          return { success: true };
        }
        await dbHelpers.runUpdate(db, "courses", $match, updates, { session });
        await runHook("afterUpdate", $match, updates, { ...gqlPacket, db, session });

        return await resolverHelpers.finishSuccessfulMutation(session, transaction);
      });
    },
    async deleteCourse(root, args, context, ast) {
      if (!args._id) {
        throw "No _id sent";
      }
      let gqlPacket = { root, args, context, ast, hooksObj };
      let { db, session, transaction } = await resolverHelpers.startDbMutation(gqlPacket, "Course", CourseMetadata, { delete: true });
      try {
        let $match = { _id: ObjectId(args._id) };
        
        if (await runHook("beforeDelete", $match, { ...gqlPacket, db, session }) === false) {
          return { success: false };
        }
        await dbHelpers.runDelete(db, "courses", $match);
        await runHook("afterDelete", $match, { ...gqlPacket, db, session });
        ;

        return await resolverHelpers.finishSuccessfulMutation(session, transaction);
      } catch (err) {
        await resolverHelpers.mutationError(err, session, transaction);
        return { success: false };
      } finally { 
        resolverHelpers.mutationOver(session);
      }
    }
  }
};